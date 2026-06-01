import os
from typing import Any, Dict, List, Optional

import httpx
from dotenv import load_dotenv

load_dotenv()


class BandClient:
    """
    Band Agent API wrapper for YOUSUN Secura.

    This client is intentionally defensive:
    - If BAND_ENABLE_REAL_API=false, it runs in safe demo mode.
    - If credentials are missing, it returns mock Band-like responses.
    - If Band API response body differs slightly, it still avoids crashing the demo.

    Band docs:
    - Agent API base: https://app.band.ai/api/v1/agent
    - Auth header: X-API-Key
    - REST commands: create chats, send messages, manage participants
    """

    def __init__(
        self,
        api_key: Optional[str] = None,
        agent_id: Optional[str] = None,
        rest_url: Optional[str] = None,
        enable_real_api: Optional[bool] = None,
    ):
        self.api_key = api_key or os.getenv("BAND_AGENT_API_KEY", "")
        self.agent_id = agent_id or os.getenv("BAND_AGENT_ID", "")
        self.rest_url = (rest_url or os.getenv("BAND_REST_URL", "https://app.band.ai/api/v1/agent")).rstrip("/")
        self.enable_real_api = (
            enable_real_api
            if enable_real_api is not None
            else os.getenv("BAND_ENABLE_REAL_API", "false").lower() == "true"
        )

    @property
    def is_ready(self) -> bool:
        return bool(self.enable_real_api and self.api_key and self.agent_id)

    def _headers(self) -> Dict[str, str]:
        return {
            "X-API-Key": self.api_key,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

    async def get_me(self) -> Dict[str, Any]:
        if not self.is_ready:
            return {
                "mode": "demo",
                "agent_id": "demo-agent",
                "agent_name": "YOUSUN Secura Demo Agent",
                "connected": False,
                "message": "Band real API is disabled or credentials are missing.",
            }

        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.get(f"{self.rest_url}/me", headers=self._headers())
            response.raise_for_status()
            return response.json()

    async def create_chat(self, title: str, task_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Creates a Band chat/room.

        Docs mention POST /agent/chats.
        Payload shape may vary slightly by platform version, so we keep it simple.
        """
        if not self.is_ready:
            return {
                "mode": "demo",
                "id": f"demo-band-room-{task_id or 'BR-2025-05-1287'}",
                "title": title,
                "task_id": task_id,
                "created": True,
            }

        payload: Dict[str, Any] = {
            "title": title,
        }

        if task_id:
            payload["task_id"] = task_id

        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.post(
                f"{self.rest_url}/chats",
                headers=self._headers(),
                json=payload,
            )
            response.raise_for_status()
            return response.json()

    async def send_message(self, chat_id: str, content: str) -> Dict[str, Any]:
        """
        Sends a text message to a Band chat/room.

        Docs mention POST /agent/chats/{id}/messages.
        """
        if not self.is_ready:
            return {
                "mode": "demo",
                "chat_id": chat_id,
                "message_id": f"demo-msg-{abs(hash(content))}",
                "content": content,
                "sent": True,
            }

        payload = {
            "content": content,
        }

        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.post(
                f"{self.rest_url}/chats/{chat_id}/messages",
                headers=self._headers(),
                json=payload,
            )
            response.raise_for_status()
            return response.json()

    async def get_context(self, chat_id: str) -> Dict[str, Any]:
        """
        Gets conversation context/history from Band.

        Docs mention GET /agent/chats/{id}/context.
        """
        if not self.is_ready:
            return {
                "mode": "demo",
                "chat_id": chat_id,
                "context": [],
                "message": "Demo mode context. Real Band context requires credentials.",
            }

        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.get(
                f"{self.rest_url}/chats/{chat_id}/context",
                headers=self._headers(),
            )
            response.raise_for_status()
            return response.json()

    async def add_participant(self, chat_id: str, peer_id: str) -> Dict[str, Any]:
        """
        Adds/recruits another peer/agent to a chat.

        Docs mention POST /agent/chats/{id}/participants.
        """
        if not self.is_ready:
            return {
                "mode": "demo",
                "chat_id": chat_id,
                "peer_id": peer_id,
                "added": True,
            }

        payload = {
            "peer_id": peer_id,
        }

        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.post(
                f"{self.rest_url}/chats/{chat_id}/participants",
                headers=self._headers(),
                json=payload,
            )
            response.raise_for_status()
            return response.json()


def get_band_client() -> BandClient:
    return BandClient()



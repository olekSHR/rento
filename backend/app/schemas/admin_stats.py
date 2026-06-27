from pydantic import BaseModel


class AdminStatsResponse(BaseModel):
    total_users: int
    total_realtors: int
    pending_realtor_applications: int
    active_listings: int
    reported_listings: int

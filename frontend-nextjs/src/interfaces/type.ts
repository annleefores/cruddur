export interface Post {
  created_at: string;
  display_name: string;
  expires_at: string;
  handle: string;
  likes_count?: number;
  message: string;
  replies_count?: number;
  reposts_count?: number;
  uuid: string;
}

export interface User {
  sub: string;
  email_verified: string;
  name: string;
  preferred_username: string;
  email: string;
  accessToken: string;
}

export interface Profile {
  bio: string;
  cognito_user_uuid: string;
  cruds_count: number;
  display_name: string;
  handle: string;
  uuid: string;
}

export interface Activity {
  created_at: string;
  display_name: string;
  expires_at: string;
  handle: string;
  message: string;
  uuid: string;
}

export interface ProfileObject {
  activities: Activity[];
  profile: Profile;
}

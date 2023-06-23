export interface Post {
  created_at?: string;
  display_name: string;
  expires_at?: string;
  handle: string;
  likes_count?: number;
  message: string;
  replies_count?: number;
  reposts_count?: number;
  uuid?: string;
  cognito_user_id?: string;
  current_user_has_liked?: boolean;
}

export interface Reply {
  created_at: string;
  display_name: string;
  handle: string;
  likes_count: number;
  message: string;
  replies_count: number;
  reply_to_activity_uuid: string;
  reposts_count: number;
  uuid: string;
}

export interface PostDataResponse {
  created_at: string;
  display_name: string;
  expires_at: string;
  handle: string;
  message: string;
  reply_to_activity_uuid?: null | string;
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

export interface PostData {
  activity: Post;
  replies: Reply[];
}

export interface MsgGrp {
  cognito_user_id?: string;
  created_at?: string;
  display_name: string;
  handle: string;
  message?: string;
  uuid: string;
}

export interface Short {
  display_name: string;
  handle: string;
  uuid: string;
}

export interface message {
  created_at?: string;
  display_name: string;
  handle: string;
  message: string;
  uuid?: string;
}

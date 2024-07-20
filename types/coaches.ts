export interface Coaches {
  id: string;
  user_id: string;
  avatar: string;
  name: string;
  biography: string;
  specialties: string[];
  coaching_style: string[];
  loves: string[];
  session_fee: number;
  created_at: Date;
  modified_at: Date;
  created_by: string;
  modified_by: string;
  deleted_at: Date;
}

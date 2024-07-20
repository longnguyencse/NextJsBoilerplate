import { Coaches } from '@/types/coaches';
import { createClient } from '@utils/supabase/client';
import { QueryData } from '@supabase/supabase-js';

const supabase = createClient();

export const CoachService = {
  async getCoachById(id: string): Promise<Coaches> {
    const coachesQuery = supabase.from('coaches').select('*').eq('id', id).single();

    type Coaches = QueryData<typeof coachesQuery>;

    const { data, error } = await coachesQuery;
    if (error) throw error;
    return data;
  },

  async createCoach(coach: Partial<Coaches>) {
    const { data, error } = await supabase.from('coaches').insert(coach);
    return data;
  },
  async updateCoach(id: string, coach: Partial<Coaches>) {
    const { data, error } = await supabase.from('coaches').update(coach).eq('id', id);
    return data;
  },
  async deleteCoach(id: string) {
    const { data, error } = await supabase.from('coaches').delete().eq('id', id);
    return data;
  },
  async getCoachRandom(): Promise<Coaches> {
    const coaches = [
      'eb914de7-937f-4c71-916d-d504ce24aca1',
      '8b90f761-5c57-45b5-bf8d-cd0196e87a96',
      '37244fd1-30f6-4ad7-a902-9f827eb00001',
      '620b7c26-e515-4746-8638-1f60601f8deb',
      'fe2a1ea6-12b5-41ba-9f5d-9125475aaaa4'
    ];
    // random 1 ele from coaches
    const randomCoach = coaches[Math.floor(Math.random() * coaches.length)];
    const coachesQuery = supabase.from('coaches').select('*').eq('id', randomCoach).single();
    type Coaches = QueryData<typeof coachesQuery>;
    const { data, error } = await coachesQuery;
    if (error) throw error;
    return data;
  }
};

export default CoachService;

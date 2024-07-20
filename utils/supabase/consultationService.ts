import { createClient } from '@utils/supabase/client';
import { Consultations } from '@/types/consultations';

const supabase = createClient();
export const ConsultationService = {
  async getConsultationById(id: string): Promise<Consultations> {
    const consultationQuery = supabase.from('consultations').select('*').eq('id', id).single();

    const { data, error } = await consultationQuery;
    if (error) throw error;
    return data;
  },

  async createConsultation(consultation: Partial<Consultations>) {
    const { data, error } = await supabase.from('consultations').insert(consultation);
    return data;
  },
  async updateConsultation(id: string, consultation: Partial<Consultations>) {
    const { data, error } = await supabase.from('consultations').update(consultation).eq('id', id);
    return data;
  },
  async deleteConsultation(id: string) {
    const { data, error } = await supabase.from('consultations').delete().eq('id', id);
    return data;
  }
};

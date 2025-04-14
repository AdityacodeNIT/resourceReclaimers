import { supabase } from './SupbaseClients';

export async function submitContactForm(name, email, ) {
  const { data, error } = await supabase
    .from('resource_reclaimers')
    .insert([{ name, email }]);
    console.log(error);

  if (error) {
    console.error('Error submitting contact form:', error);
  } else {
    console.log('Contact form submitted successfully:', data);
  }
}

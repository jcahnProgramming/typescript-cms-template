import { createClient } from '@supabase/supabase-js';
export async function canEditGroup(supabase: ReturnType<typeof createClient>, groupId: string) {
const { data } = await supabase.rpc('has_group_permission', { g: groupId, perm: 'edit_content' });
return !!data;
}
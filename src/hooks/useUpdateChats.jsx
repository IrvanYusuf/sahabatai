import { supabase } from "../supabase/supabase";

const useUpdateChats = async (idPromptParent, idUser, newMessage) => {
  try {
    const { data, error } = await supabase
      .from("tbl_chats")
      .update({
        message: newMessage,
      })
      .eq("id_prompt_parent", idPromptParent)
      .eq("id_user", idUser)
      .select();

    console.log(data);
    console.log(error);
    return { data: data, error: error };
  } catch (error) {
    console.log(error);
    return { data: null, error: error };
  }
};

export default useUpdateChats;

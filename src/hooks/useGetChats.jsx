import { supabase } from "../supabase/supabase";

const useGetChats = async (idPromptParent, idUser) => {
  try {
    const { data: dataGetChat, error } = await supabase
      .from("tbl_chats")
      .select()
      .eq("id_prompt_parent", idPromptParent);
    // .eq("id_user", idUser);
    console.log(dataGetChat);
    console.log(dataGetChat.length);
    if (!dataGetChat || dataGetChat.length === 0) {
      console.log("kosong");
      return { data: dataGetChat, error: null };
    }
    return { data: dataGetChat, error: error };
  } catch (error) {
    console.log(error);
    return { data: null, error: error };
  }
};

export default useGetChats;

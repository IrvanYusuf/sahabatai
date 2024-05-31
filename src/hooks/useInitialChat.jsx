import { supabase } from "../supabase/supabase";

const useInitialChat = async (
  insertData,
  idUser,
  promptUser,
  messageResponse
) => {
  try {
    const { data, error } = await supabase
      .from("tbl_chats")
      .insert({
        id_prompt_parent: insertData[0].id,
        id_user: idUser,
        message: [
          {
            sender: "user",
            message: promptUser,
          },
          {
            sender: "model",
            message: messageResponse,
          },
        ],
      })
      .select();

    return { data: data, error: error };
  } catch (error) {
    console.log(error);
    return { data: null, error: error };
  }
};

export default useInitialChat;

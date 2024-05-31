const useFetchPrompt = async (inputPromptUser) => {
  const GEMINI_API_KEY = import.meta.env.VITE_API_KEY_GEMINI;
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: inputPromptUser }] }],
        generationConfig: {
          maxOutputTokens: 256,
        },
      }),
    }
  );

  const data = await response.json();

  return data;
};

export default useFetchPrompt;

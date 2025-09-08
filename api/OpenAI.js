import openai
client = openai.OpenAI(api_key="key")

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Answer this question correctly."},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "",
                    },
                },
            ],
        }
    ],
    max_tokens=600,
)

#print(response.choices[0])
print(response.choices[0].message.content)

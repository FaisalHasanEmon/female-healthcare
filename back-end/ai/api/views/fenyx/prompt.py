import openai
from django.conf import settings

class OpenAIConfig:
    """
    A class to encapsulate all interactions with the OpenAI API.
    It handles initialization, a generic response method, and specific methods
    for generating wellness insights, goals, food, and supplement suggestions.
    """
    def __init__(self, api_key: str = settings.FENYX_OPENAI_API_KEY, model: str = "gpt-4o-mini"):
        """
        Initializes the OpenAI API configuration with the given API key and model.
        The API key is expected to be passed from Django's settings.
        """
        self.api_key = api_key
        self.model = model
        openai.api_key = self.api_key

    def get_response(self, prompt: str, temperature: float = 0.7, max_tokens: int = 150, context: str = None):
        """
        Sends a request to OpenAI's API and returns the response, incorporating
        optional context (such as PDF content) for better responses.

        :param prompt: The input prompt for the model.
        :param temperature: Sampling temperature (default is 0.7).
        :param max_tokens: Maximum number of tokens to generate (default is 150).
        :param context: Optional context (e.g., PDF content) to provide for better responses.
        :return: The generated AI response as a string.
        """
        try:
            # The system prompt sets the persona for the AI assistant.
            system_prompt = (
                "You are a calm, empathetic, and friendly wellness coach. "
                "Your responses should be short, thoughtful and supportive. "
                "Your goal is to help users feel empowered and informed about "
                "their health, fitness, and emotional well-being."
            )

            user_prompt = f"User's question: {prompt}"
            if context:
                # Add context from the wellness guide if available.
                user_prompt += f"\n\nHere is some relevant information from the wellness guide:\n{context}"

            final_prompt = f"{system_prompt}\n{user_prompt}"

            response = openai.ChatCompletion.create(
                model=self.model,
                messages=[{"role": "user", "content": final_prompt}],
                temperature=temperature,
                max_tokens=max_tokens
            )

            return response['choices'][0]['message']['content']
        except openai.error.OpenAIError as e:
            print(f"Error communicating with OpenAI API: {e}")
            return "Sorry, I couldn't process your request at the moment. Please try again later."
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            return "An unexpected error occurred. Please try again later."

    def generate_insight(self, cycle: str, phase: str, context: str):
        """
        Generates a tailored FENYX insight based on the user's cycle and phase.

        :param cycle: The user's cycle (e.g., 'Yes' for regular cycle).
        :param phase: The selected phase (e.g., 'Luteal', 'Follicular').
        :param context: Optional context (e.g., PDF content) for personalized insights.
        :return: The generated FENYX insight.
        """
        try:
            prompt = (
                f"Just Generate a small insight message for a user "
                f"with cycle '{cycle}' and phase '{phase}'. "
                "Do not include any warm or conversational greetings."
            )
            response = self.get_response(prompt, context=context)
            return response
        except Exception as e:
            print(f"Error generating insight: {e}")
            return "Sorry, I couldn't generate your insight at the moment. Please try again later."

    def get_goal(self, cycle: str, phase: str, context: str):
        """
        Generates a goal-oriented response based on the user's cycle and phase.
        Focuses on describing the goal of the phase without additional food or
        supplement suggestions.

        :param cycle: The user's cycle (e.g., 'Yes' for regular cycle).
        :param phase: The selected phase (e.g., 'Follicular', 'Luteal').
        :param context: Optional context (e.g., PDF content) for personalized responses.
        :return: The generated goal-oriented response.
        """
        try:
            prompt = (
                f"Generate a goal-based, descriptive answer for a user in the "
                f"'{phase}' phase with cycle '{cycle}'. Focus only on the goal "
                "of this phase (e.g., rising estrogen, mental clarity, rest, etc.). "
                "Avoid food suggestions, supplements, or specific actions unless "
                "they directly relate to the goal."
            )
            response = self.get_response(prompt, context=context)
            return response
        except Exception as e:
            print(f"Error generating goal response: {e}")
            return "Sorry, I couldn't process your goal at the moment. Please try again later."

    def get_food(self, cycle: str, phase: str, context: str):
        """
        Generates food suggestions based on the user's cycle and phase.

        :param cycle: The user's cycle (e.g., 'Yes' for regular cycle).
        :param phase: The selected phase (e.g., 'Follicular', 'Luteal').
        :param context: Optional context (e.g., PDF content) for personalized food suggestions.
        :return: The generated food suggestions.
        """
        try:
            prompt = (
                f"Generate food suggestions for a user in the '{phase}' phase "
                f"with cycle '{cycle}'. Focus on foods that support the body's "
                "needs during this phase, such as those rich in specific nutrients "
                "or beneficial for hormonal balance."
            )
            response = self.get_response(prompt, context=context)
            return response
        except Exception as e:
            print(f"Error generating food suggestions: {e}")
            return "Sorry, I couldn't provide food suggestions at the moment. Please try again later."

    def get_supplement(self, cycle: str, phase: str, context: str):
        """
        Generates supplement suggestions based on the user's cycle and phase.

        :param cycle: The user's cycle (e.g., 'Yes' for regular cycle).
        :param phase: The selected phase (e.g., 'Follicular', 'Luteal').
        :param context: Optional context (e.g., PDF content) for personalized supplement suggestions.
        :return: The generated supplement suggestions.
        """
        try:
            prompt = (
                f"Generate supplement suggestions for a user in the '{phase}' phase "
                f"with cycle '{cycle}'. Focus on supplements that support hormonal "
                "balance, energy levels, and overall well-being during this phase."
            )
            response = self.get_response(prompt, context=context)
            return response
        except Exception as e:
            print(f"Error generating supplement suggestions: {e}")
            return "Sorry, I couldn't provide supplement suggestions at the moment. Please try again later."
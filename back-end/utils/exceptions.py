from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None and response.data:
        # Combine all error messages into one string (optional logic)
        messages = []

        for key, value in response.data.items():
            if isinstance(value, list):
                messages.extend(value)
            else:
                messages.append(str(value))

        # Replace original data with your custom key
        response.data = {
            "error": " ".join(messages)
        }

    return response

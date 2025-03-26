def handler(event):
    return f"Hello, {event.get('name', 'World')}!"

# Test it directly too
if __name__ == "__main__":
    print(handler({"name": "HomeCloud"}))

from playwright.sync_api import sync_playwright

def verify_portfolio():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Wait for the server to start (a bit crude but effective)
            page.goto("http://localhost:3000", timeout=60000)

            # Wait for content to load
            page.wait_for_selector("text=Welcome to my world", timeout=10000)

            # Take screenshot of Home
            page.screenshot(path="/home/jules/verification/home.png", full_page=True)
            print("Home verified")

            # Go to Projects
            page.click("text=Projects")
            page.wait_for_selector("text=Projects")
            # Wait a bit for "loading" to finish or content to appear
            page.wait_for_timeout(2000)
            page.screenshot(path="/home/jules/verification/projects.png", full_page=True)
            print("Projects verified")

            # Go to Skills
            page.click("text=Skills")
            page.wait_for_selector("text=Skills & Technologies")
            page.screenshot(path="/home/jules/verification/skills.png", full_page=True)
            print("Skills verified")

             # Go to Education
            page.click("text=Education")
            page.wait_for_selector("text=Education")
            page.screenshot(path="/home/jules/verification/education.png", full_page=True)
            print("Education verified")

            # Go to Contact
            page.click("text=Contact")
            page.wait_for_selector("text=Contact Me")
            page.screenshot(path="/home/jules/verification/contact.png", full_page=True)
            print("Contact verified")

            # Go to AI Chat
            page.click("text=AI Chat")
            page.wait_for_selector("text=Ask AI about Zain")

            # Interact with Chat
            page.fill("input[placeholder='Type your question...']", "What are your skills?")
            page.click("button >> svg.rotate-90") # Paper airplane icon

            # Wait for response (simulated delay)
            page.wait_for_timeout(3000)
            page.screenshot(path="/home/jules/verification/aichat.png", full_page=True)
            print("AI Chat verified")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_portfolio()

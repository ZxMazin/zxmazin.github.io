import os
import re

def verify_files():
    # 1. Check style.css for vertical scroll and transition
    with open('style.css', 'r') as f:
        style = f.read()
        assert 'translateY(100%)' in style, "Scroll animation should start at 100%"
        assert 'translateY(-100%)' in style, "Scroll animation should end at -100%"
        assert 'cubic-bezier(0.34, 1.56, 0.64, 1)' in style, "Login button should have bouncy transition"

    # 2. Check script.js for audio and video logic
    with open('script.js', 'r') as f:
        script = f.read()
        assert 'toggleSpeech' in script, "toggleSpeech function should exist"
        assert 'data.audio_fr' in script or 'customAudio' in script, "Audio logic should reference custom files"
        assert 's.read_aloud' in script, "Script should use localized read_aloud string"
        assert 'videoId' in script, "Script should handle videoId for interludes"

    # 3. Check data.js for unique videoIds and audio paths
    with open('data.js', 'r') as f:
        data = f.read()
        video_ids = re.findall(r'videoId:\s*"(.*?)"', data)
        assert len(set(video_ids)) > 1, "There should be multiple unique videoIds"
        assert 'audio_fr:' in data, "data.js should contain audio paths"
        assert 'read_aloud:' in data, "uiStrings should contain read_aloud label"

    print("Verification successful!")

if __name__ == "__main__":
    verify_files()

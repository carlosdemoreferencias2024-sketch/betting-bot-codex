import json
import urllib.error
import urllib.request


class RequestException(Exception):
    pass


class exceptions:
    RequestException = RequestException


class Response:
    def __init__(self, url, status_code, content):
        self.url = url
        self.status_code = status_code
        self.content = content
        self.text = content.decode("utf-8", errors="replace")

    def json(self):
        return json.loads(self.text)


def get(url, timeout=30, headers=None):
    req = urllib.request.Request(url, headers=headers or {"User-Agent": "Codex-PyESPN-Probe/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return Response(url, getattr(resp, "status", 200), resp.read())
    except urllib.error.HTTPError as exc:
        try:
            body = exc.read()
        except Exception:
            body = b""
        return Response(url, getattr(exc, "code", 500), body)
    except Exception as exc:
        raise RequestException(str(exc)) from exc

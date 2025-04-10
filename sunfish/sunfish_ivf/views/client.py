import posixpath
from pathlib import Path

from django.utils._os import safe_join
from django.views.static import serve as static_serve

def serve_react(request, path, document_root=None):
    # builds a path to the frontends static build dir from which they are served
    path = posixpath.normpath(path).lstrip("/")
    fullpath = Path(safe_join(document_root, path))
    if fullpath.is_file():
        return static_serve(request, path, document_root)
    else:
        return static_serve(request, "index.html", document_root)

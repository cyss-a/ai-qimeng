#!/usr/bin/env python3
"""PyAV 边解码边按目标时间点抽帧（不缓存全帧，避免 OOM），保存 PNG 供多模态读取。"""
import os
import sys
import av
from PIL import Image

VIDEO = sys.argv[1] if len(sys.argv) > 1 else "/Users/mac/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_3suh5a4ln82m12_841a/msg/video/2026-08/74fea54f7d35417cd124f9810139553c_raw.mp4"
OUTDIR = sys.argv[2] if len(sys.argv) > 2 else "/Volumes/池/素材+软件/workbuddy/2026-08-11-12-21-13/.tmp-frames"
N = int(sys.argv[3]) if len(sys.argv) > 3 else 20

os.makedirs(OUTDIR, exist_ok=True)

container = av.open(VIDEO)
vstream = container.streams.video[0]
duration = float(vstream.duration * vstream.time_base)
print(f"video {vstream.width}x{vstream.height} duration={duration:.1f}s", flush=True)

# 目标时间点（覆盖首尾，均匀）
targets = [duration * i / (N - 1) for i in range(N)]
saved = []
ti = 0
for frame in container.decode(video=0):
    t = float(frame.pts * frame.time_base)
    if ti < len(targets) and t >= targets[ti]:
        img: Image.Image = frame.to_image()
        fname = f"frame_{ti:02d}_{int(t):05d}s.png"
        img.save(os.path.join(OUTDIR, fname))
        saved.append((fname, t))
        print(f"  saved {fname} t={t:.1f}s", flush=True)
        ti += 1
        if ti >= len(targets):
            break
container.close()
print(f"DONE {len(saved)} frames in {OUTDIR}", flush=True)

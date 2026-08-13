#!/usr/bin/env python3
"""从微信视频中均匀抽取关键帧，保存为 PNG，供多模态读取以提炼内容。"""
import os
import sys
import imageio.v2 as imageio
import imageio_ffmpeg

VIDEO = sys.argv[1] if len(sys.argv) > 1 else "/Users/mac/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_3suh5a4ln82m12_841a/msg/video/2026-08/74fea54f7d35417cd124f9810139553c_raw.mp4"
OUTDIR = sys.argv[2] if len(sys.argv) > 2 else "/Volumes/池/素材+软件/workbuddy/2026-08-11-12-21-13/.tmp-frames"
N = int(sys.argv[3]) if len(sys.argv) > 3 else 16

os.makedirs(OUTDIR, exist_ok=True)

# 强制使用 imageio-ffmpeg 提供的 ffmpeg 二进制
os.environ["IMAGEIO_FFMPEG_EXE"] = imageio_ffmpeg.get_ffmpeg_exe()

reader = imageio.get_reader(VIDEO, format="ffmpeg")
meta = reader.get_meta_data()
fps = meta.get("fps") or 25
n_frames = meta.get("nframes") or 0
duration = meta.get("duration") or 0
print(f"fps={fps} nframes={n_frames} duration={duration:.1f}s size={meta.get('size')}")

if n_frames and n_frames > 0:
    indices = [int(i * n_frames / N) for i in range(N)]
else:
    # 退化：按时间均匀取
    indices = []
    for i in range(N):
        t = duration * i / N
        indices.append(int(t * fps))

saved = []
seen = set()
for i, idx in enumerate(indices):
    if idx in seen:
        continue
    seen.add(idx)
    try:
        frame = reader.get_data(idx)
    except Exception as e:
        print(f"  frame {idx} 读取失败: {e}")
        continue
    path = os.path.join(OUTDIR, f"frame_{i:02d}_{idx:06d}.png")
    imageio.imwrite(path, frame)
    saved.append(path)

reader.close()
print(f"已保存 {len(saved)} 帧到 {OUTDIR}")
for p in saved:
    print("  ", os.path.basename(p))

import os
os.umount('/')
os.VfsLfs2.mkfs(bdev)
os.mount(bdev, '/')

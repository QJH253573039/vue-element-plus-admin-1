import Clipboard from 'clipboard';
import { ElMessage } from 'element-plus'


function clipboardSuccess(text) {
    ElMessage({
        showClose: true,
        message: `复制${text}成功`,
        type: 'success'
    });
}

function clipboardFail(text) {
    ElMessage({
        showClose: true,
        message: `复制${text}失败`,
        type: 'error'
    });
}

export default function handleClipboard(text, event) {
    const clipboard = new Clipboard(event.target, {
        text: () => text
    })
    clipboard.on('success', () => {
        clipboardSuccess(text)
        clipboard.destroy()
    })
    clipboard.on('error', () => {
        clipboardFail(text)
        clipboard.destroy()
    })
    clipboard.onClick(event);
}
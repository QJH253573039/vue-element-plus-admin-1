import Clipboard from 'clipboard'

if (!Clipboard) {
    throw new Error('you should npm install `clipboard` --save at first ')
}

let successCallback = null;
let errorCallback = null;
let clipboardInstance = Clipboard;

const clipboard = {
    beforeMount(el,binding) {
        if (binding.arg === 'success') {
            successCallback = binding.value
        } else if (binding.arg === 'error') {
            errorCallback = binding.value
        } else {
            clipboardInstance = new Clipboard(el, {
                text() { return binding.value },
                action() { return binding.arg === 'cut' ? 'cut' : 'copy' }
            })
            clipboardInstance.on('success', e => {
                const callback = successCallback
                callback && callback(e)
            })
            clipboardInstance.on('error', e => {
                const callback = errorCallback
                callback && callback(e)
            })
        }
    },
    beforeUpdate(el, binding) {
        if (binding.arg === 'success') {
            successCallback = binding.value
        } else if (binding.arg === 'error') {
            errorCallback = binding.value
        } else {
            clipboardInstance = new Clipboard(el, {
                text() { return binding.value },
                action() { return binding.arg === 'cut' ? 'cut' : 'copy' }
            })
        }
    },
    beforeUnmount(_, binding) {
        if (binding.arg === 'success') {
            successCallback = null
        } else if (binding.arg === 'error') {
            errorCallback = null
        } else {
            if (clipboardInstance) {
                clipboardInstance.destroy()
            }
            clipboardInstance = null
        }
    }
}


export default clipboard;
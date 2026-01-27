import Swal from 'sweetalert2'

type SwalIcon = 'success' | 'error' | 'warning' | 'info' | 'question'

export const handleResponse = (message: string, icon: SwalIcon) => {
  Swal.fire({
    title: message,
    icon,
    draggable: false,
  })
}

export const handleToast = (message: string, icon: SwalIcon) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })
  Toast.fire({
    icon,
    title: message,
  })
}

import { Controller } from 'stimulus'
import Swal from 'sweetalert2'
import toastr from 'toastr'

export default class extends Controller {
  dialog(event) {
    event.preventDefault();
    let originLink = event.target.href
    let target_id_attr = event.target.closest('tr').id

    Swal.fire({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: 'DELETE',
          url: `${originLink}.json`
        }).then(() => {
          $(`#${target_id_attr}`).slideUp(1000)
          toastr.success("Successfully deleted.")
        }).catch((err) => {
          console.log(err.statusText)
          toastr.error("Error occurred.")
        })
      }
    })
  }
}
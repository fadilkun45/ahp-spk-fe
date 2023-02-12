import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog } from "@mui/joy";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const ModalEditAkun = ({ show, closeModal, obj, submit }) => {

  const [formData,setFormData] = useState()

  useEffect(() => {
    setFormData(obj)
  },[])

  return (
    <Modal
    aria-labelledby="modal-title"
    aria-describedby="modal-desc"
    open={show}
    onClose={() => closeModal()}
    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    <ModalDialog
      aria-labelledby="layout-modal-title"
      aria-describedby="layout-modal-description"
      sx={{ width: { sm: "300px", lg: "500px" }, background: "#FFF" }}
    >
      <ModalClose />
      <Typography id="layout-modal-title" component="h2">
          Edit Akun
      </Typography>

      <Stack spacing={3}>
          
        <TextField id="standard-basic" label="Nama" value={formData?.nama} onChange={(v) => setFormData({...formData, nama: v.target.value })} variant="standard" />
        <TextField id="standard-basic" label="Email" value={formData?.email} disabled variant="standard" />
        <TextField id="standard-basic" label="Jabatan" value={formData?.jabatan} disabled variant="standard" />
        <TextField id="standard-basic" type="password" value={formData?.kataSandi} onChange={(v) => setFormData({...formData, kataSandi: v.target.value })} label="Password" variant="standard" />

      </Stack>

      <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
        <Button variant="contained" onClick={closeModal} color="error">
          Batal
        </Button>
        <Button variant="contained" onClick={() =>  submit(formData)} color="primary">
          Simpan
        </Button>
      </Stack>
    </ModalDialog>
  </Modal>
  );
};

export default ModalEditAkun;

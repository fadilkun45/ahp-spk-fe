import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog } from "@mui/joy";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const ModalNewKandidat = ({ show, closeModal, obj, submit }) => {

    const [penilaiOptions, setPenilaiOptions] = useState([])
    const [formData, setFormData] = useState({
      nama: "",
    })

    useEffect(() => {
     
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
            Tambah Kandidat
        </Typography>
        

        <Stack spacing={3}>
            
          <TextField id="standard-basic" label="Nama" variant="standard" onChange={(v) => setFormData({...formData, nama: v.target.value})} />
          <TextField id="standard-basic" label="No Handphone" variant="standard" onChange={(v) => setFormData({...formData, nama: v.target.value})} />
          <TextField id="standard-basic" label="Email" variant="standard" onChange={(v) => setFormData({...formData, nama: v.target.value})} />

          <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={penilaiOptions}
              onChange={(v) => setFormData({...formData, jenis: v.target.textContent })}
              renderInput={(params) => <TextField {...params} label="Senior Programmer Penilai" />}
            />

        </Stack>

        <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
          <Button variant="contained" onClick={closeModal} color="error">
            Batal
          </Button>
          <Button variant="contained" onClick={() => submit(formData)} color="primary">
            Simpan
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default ModalNewKandidat;

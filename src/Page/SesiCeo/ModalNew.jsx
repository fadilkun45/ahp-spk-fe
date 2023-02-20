import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog } from "@mui/joy";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getKriteriaNewDropdown } from "../../Redux/Service/MasterService";

const ModalNew = ({ show, closeModal, obj, submit }) => {

    const [kriteriaOptions, setkriteriaOptions] = useState([])
    const [formData, setFormData] = useState({
      namaSesi: "",
    })

    useEffect(() => {
      getKriteriaNewDropdown().then((res) => {
        setkriteriaOptions(res.jenisKriteria)
      })
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
            Tambah Sesi
        </Typography>

        <Stack spacing={3}>
            
          <TextField id="standard-basic" label="Nama Sesi" variant="standard" onChange={(v) => setFormData({...formData, namaSesi: v.target.value})} />
          {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={kriteriaOptions}
              onChange={(v) => setFormData({...formData, jenis: v.target.textContent })}
              renderInput={(params) => <TextField {...params} label="Kriteria Mempuyai" />}
            /> */}

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

export default ModalNew;

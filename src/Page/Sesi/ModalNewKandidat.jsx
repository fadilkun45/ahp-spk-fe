import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog } from "@mui/joy";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSeniorDropdown } from "../../Redux/Service/MasterService";
import ReactSelect from "react-select";

const ModalNewKandidat = ({ show, closeModal, obj, submit }) => {

  const [formData, setFormData] = useState({
    namaKandidat: "",
    emailKandidat: "",
    noHpKandidat: "",
    idSeniorProgrammer: ""
  })
  const { data: dropdown, isLoading, refetch } = useQuery(
    ["dropdownSenior"],
    () => {
      return getSeniorDropdown();
    },
    { refetchIntervalInBackground: false, retry: false }
  );


  const [dataDrop, setDataDrop] = useState([]);

  useEffect(() => {
    let data = [];

    dropdown?.seniorProgrammer?.map((v) => {
      data.push({ value: v.id, label: v.nama });
    });

    setDataDrop(data);

    console.log(data)
  }, [dropdown]);




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

          <TextField id="standard-basic" label="Nama" variant="standard" onChange={(v) => setFormData({ ...formData, namaKandidat: v.target.value })} />
          <TextField id="standard-basic" label="No Handphone" variant="standard" onChange={(v) => setFormData({ ...formData, emailKandidat: v.target.value })} />
          <TextField id="standard-basic" label="Email" variant="standard" onChange={(v) => setFormData({ ...formData, noHpKandidat: v.target.value })} />

          <ReactSelect
            options={dataDrop}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
            onChange={(v) =>
              setFormData({...formData, idSeniorProgrammer: v.value})
            }
            menuPlacement="top"
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

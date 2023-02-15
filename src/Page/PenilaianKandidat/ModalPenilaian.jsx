import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog } from "@mui/joy";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { getKriteria, getSoalKandidat } from "../../Redux/Service/MasterService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import ReactSelect from "react-select";


const ModalPenilaian = ({ show, closeModal, obj, submit }) => {

  const { data: soal, isLoading, refetch } = useQuery(
    ["soal", [obj?.id]], () => {
      return getSoalKandidat(obj?.id);
    },
    { refetchIntervalInBackground: false, retry: false }
  )


  const [dataDrop, setDataDrop] = useState([]);

  useEffect(() => {

    soal?.daftarKandidat?.map((v) => {
      let data = [];

      v.intensitasKriteria?.map((vx) => {
          data.push({value: vx.idIntensitas , label: vx.namaIntensitas })
      })

      v.option = data
    });

  }, [soal]);

  const [jawaban, setJawaban] = useState([])

  const handleJawaban = (row) => {
      if(jawaban.filter((v) => v.idKriteria === row.id_kriteria_ahp).length == 0){
          setJawaban([...jawaban, {idKriteria: row.id_kriteria_ahp, idIntensitas: row.value }])
      }else{
        let jawabanTemp = jawaban.filter((v) => v.idKriteria !== row.id_kriteria_ahp)
        setJawaban([...jawabanTemp, {idKriteria: row.id_kriteria_ahp,idIntensitas: row.value }])      }

  }


  const checkData = () => {
    if(jawaban.length !== soal?.daftarKandidat?.length){
      return true
    }
    return false
  }


  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={show}
      onClose={() => closeModal()}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}
    >
      <ModalDialog
        aria-labelledby="layout-modal-title"
        aria-describedby="layout-modal-description"
        sx={{ width: { sm: "300px", lg: "700px" }, background: "#FFF"}}
      >
        <ModalClose />
        <Typography id="layout-modal-title" component="h2">
          Penilaian Kandidat Programmer {obj?.nama}
        </Typography>

        <Stack spacing={3} sx={{ height: "60vh", overflowY: "auto" }}>
          {
            soal?.daftarKandidat?.map((v) => (
              <>
                <Stack spacing={2} direction="row">

                  <Typography id="layout-modal-description" sx={{width: "50%"}} textColor="text.tertiary" >
                   {v?.namaKriteria}
                
                  </Typography>

                  <Stack sx={{width: "40%"}}>
                  <ReactSelect
                    options={v?.intensitasKriteria}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999, width: "380px" }) }}
                    menuPortalTarget={document.body}
                    onChange={(vx)=>
                      handleJawaban(vx)
                    }
                    menuPlacement="top"
                  />

                  </Stack>

                </Stack>
              </>

            ))
          }

        </Stack>
        <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
          <Button variant="contained" onClick={closeModal} color="error">
            Batal
          </Button>
          <Button disabled={checkData()} variant="contained" onClick={() => submit(jawaban)} color="primary">
            Simpan
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default ModalPenilaian;

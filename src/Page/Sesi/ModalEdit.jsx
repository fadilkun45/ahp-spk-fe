import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog, Table } from "@mui/joy";
import {
  Button,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import ModalDelete from "./ModalDeleteKandidat";
// import ModalNewIntesitas from "./ModalNewIntesitas";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import {
  DeleteKandidat,
  DeleteKriteria,
  getDataKriteria,
  postIntesitas,
  postKandidat,
  postKriteria,
  postPerbandingan,
} from "../../Redux/Service/MasterService";
import { useQuery } from "@tanstack/react-query";
import ModalNewKandidat from "./ModalNewKandidat";
import { getDataDetailSesi } from "../../Redux/Service/MasterService";
import ModalViewNilai from "./ModalViewNilai";

const ModalEdit = ({
  show,
  closeModal,
  obj,
  submit,
  setIsloading,
  perbandingan,
  level
}) => {
  const [modalNew, setModalNew] = useState(false);
  const [modalView, setModalView] = useState(false)
  const [DetailData, setDetailData] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const { data, isLoading, refetch } = useQuery(
    ["sesiDetails"],
    () => {
      return getDataDetailSesi(obj.idSesi);
    },
    { refetchIntervalInBackground: false, retry: false }
  );

  const [dataDrop, setDataDrop] = useState([]);

  useEffect(() => {
    let datas = [];

    perbandingan?.dropdown?.map((v) => {
      datas.push({ value: v.id, label: v.keterangan })
    });

    data?.daftarPerbandingan?.map((x) => {
      x.details = datas.filter((item) => item.value === x.idnilai)[0]
    })

    setDataDrop(datas);
  }, [perbandingan, data]);

  const cels = [
    "Nama Kandidat",
    "Rata-Rata Nilai Ideal",
    "Total Nilai Normal",
    "Ranking",
    "Pemberi Nilai",
    "No HP",
    "Email",
    "Action"
  ];

  const openModalNew = (row) => {
    setDetailData(row);
    setModalNew(true);
  };

  const openModalDelete = (row) => {
    setDetailData(row);
    setModalDelete(true);
  };

  const handleHapusKandidat = (row) => {
    setIsloading(true);
    DeleteKandidat(row.id)
      .then((res) => {
        refetch();
        setModalDelete(false);
        setIsloading(false);
        toast.success("Hapus Kandidat berhasil");
      })
      .catch((err) => {
        setIsloading(false);
        setModalDelete(false);
        toast.error(`gagal Hapus Kandidat ${err}`);
      });
  };

  const handlePilihPerbandingan = (value, row) => {
    console.log(value);
    setIsloading(true);
    postPerbandingan({ idKriteriaPertama: row?.idkriteriapertama, idKriteriaKedua: row?.idkriteriakedua, idPenilaian: value }).then((res) => {
      refetch()
      // setModalNew(false)
      setIsloading(false)
      // toast.success('Perbandingan Kriteria berhasil')
    }).catch((err) => {
      setIsloading(false)
      // setModalNew(false)
      // toast.error(`gagal Perbandingan Kriteria ${err}`)
    })
  };

  const handleNewKandidat = (row) => {
    setIsloading(true)
    postKandidat({ ...row, idSesi: obj?.idSesi })
      .then((res) => {
        refetch();
        setModalNew(false);
        setIsloading(false);
        // toast.success("buat Kriteria berhasil");
      })
      .catch((err) => {
        setIsloading(false);
        setModalNew(false);
        // toast.error(`gagal buat Kriteria ${err}`);
      });
  };



  const openModalDetail = (row) => {
    setDetailData(row)
    setModalView(true)
  }


  return (
    <>

      {modalView && <ModalViewNilai show={modalView} obj={DetailData} closeModal={() => setModalView(false)} />}

      {modalNew && (
        <ModalNewKandidat
          show={modalNew}
          closeModal={() => setModalNew(false)}
          obj={DetailData}
          submit={handleNewKandidat}
        />
      )}

      {modalDelete && (
        <ModalDelete
          show={modalDelete}
          closeModal={() => setModalDelete(false)}
          obj={DetailData}
          submit={handleHapusKandidat}
        />
      )}

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={show}
        onClose={() => closeModal()}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
          sx={{ width: "80%", background: "#FFF" }}
        >
          <ModalClose />
          <Typography id="layout-modal-title" component="h2">
            Daftar Kandidat
          </Typography>
          <Button
            sx={{ marginBottom: "20px" }}
            variant="contained"
            onClick={() => openModalNew()}
          >
            Tambah Kandidat
          </Button>

          <Stack sx={{ overflowY: "auto", height: "60vh" }}>
            <Stack spacing={2}>
              {/* <Typography level="3" textAlign="center">

              </Typography> */}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {cels.map((item) => (
                        <TableCell align="right">{item}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.daftarKandidatSesi?.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{row?.nama}</TableCell>
                        <TableCell align="left">{row?.rataRataNilaiIdeal}</TableCell>
                        <TableCell align="left">{row?.totalNilaiNormal}</TableCell>
                        <TableCell align="left">{row?.rank}</TableCell>
                        <TableCell align="left">{row?.namaSeniorProgrammerPenilai}</TableCell>
                        <TableCell align="left">{row?.noHp}</TableCell>
                        <TableCell align="left">{row?.email}</TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ marginRight: "8px" }}
                            onClick={() => openModalDelete(row)}
                          >
                            Hapus
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            sx={{ marginRight: "8px" }}
                            onClick={() => openModalDetail(row)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>

          </Stack>

          <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
            <Button variant="contained" onClick={closeModal} color="primary">
              Tutup
            </Button>
            <Button 
              variant="contained" 
              onClick={() => submit(obj)} 
              color="success"
              disabled={obj?.bolehDiselesaikan === false}
            >
              Selesai Sesi
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ModalEdit;

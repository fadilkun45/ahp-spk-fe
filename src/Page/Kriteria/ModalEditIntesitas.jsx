import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog, Table } from "@mui/joy";
import {
  Autocomplete,
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
import ModalDelete from "./ModalDelete";
import ModalNewIntesitas from "./ModalNewIntesitas";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import {
  DeleteKriteria,
  getDataKriteria,
  getDataPerbandingan,
  postIntesitas,
  postKriteria,
  postPerbandingan,
} from "../../Redux/Service/MasterService";
import { useQuery } from "@tanstack/react-query";

const ModalEditIntesitas = ({
  show,
  closeModal,
  obj,
  submit,
  setIsloading,
  perbandingan,
  level
}) => {
  const [modalNew, setModalNew] = useState(false);
  const [DetailData, setDetailData] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const { data, isLoading, refetch } = useQuery(
    ["kriteriaDetails"],
    () => {
      return getDataKriteria(`?idKriteriaInduk=${obj?.idKriteria}`);
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
  }, [perbandingan,data]);



  // console.log(data)

  const cels = [
    "Nama",
    "Bobot Prioritas",
    "Nilai Normal",
    "Action",
  ];

  const celsBanding = ["Nama", "Prioritas", "Nama Kriteria yang dibandingkan"];

  const openModalNew = (row) => {
    setDetailData(row);
    setModalNew(true);
  };

  const openModalDelete = (row) => {
    setDetailData(row);
    setModalDelete(true);
  };

  const handleHapusKriteria = (row) => {
    setIsloading(true);
    DeleteKriteria(row.idKriteria)
      .then((res) => {
        refetch();
        setModalDelete(false);
        setIsloading(false);
        toast.success("Hapus Kriteria berhasil");
      })
      .catch((err) => {
        setIsloading(false);
        setModalDelete(false);
        toast.error(`gagal Hapus Kriteria ${err}`);
      });
  };

  const handlePilihPerbandingan = (value, row) => {
    console.log(value);
    setIsloading(true);
    postPerbandingan({idKriteriaPertama: row?.idkriteriapertama ,idKriteriaKedua: row?.idkriteriakedua, idPenilaian: value}).then((res) => {
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

  const handleNewKriteria = (row) => {
    setIsloading(true);
    postIntesitas({...row, idKriteria: obj?.idKriteria})
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

  return (
    <>
      {modalNew && (
        <ModalNewIntesitas
          show={modalNew}
          closeModal={() => setModalNew(false)}
          obj={DetailData}
          submit={handleNewKriteria}
        />
      )}

      {modalDelete && (
        <ModalDelete
          show={modalDelete}
          closeModal={() => setModalDelete(false)}
          obj={DetailData}
          submit={handleHapusKriteria}
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
          Intesitas Kriteria
          </Typography>
          <Button
            sx={{ marginBottom: "20px" }}
            variant="contained"
            onClick={() => openModalNew()}
          >
            Tambah Intensitas Kriteria Baru
          </Button>

          <Stack sx={{ overflowY: "auto", height: "60vh" }}>
            <Stack spacing={2}>
              <Typography level="3" textAlign="center">
                level {level} {obj?.namaKriteria}
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {cels.map((item) => (
                        <TableCell align="right">{item}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.daftarKriteria?.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{row?.namaKriteria}</TableCell>
                        <TableCell align="left">{row?.bobot}</TableCell>
                        <TableCell align="left">{row?.nilaiNormal}</TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ marginRight: "8px" }}
                            onClick={() => openModalDelete(row)}
                          >
                            Hapus
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>

            <Stack spacing={2} sx={{ marginTop: "60px" }}>
              <Typography level="3" textAlign="center">
                Perbandingan Berpasangan Level {level} {obj?.namaKriteria}
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {celsBanding.map((item) => (
                        <TableCell align="right">{item}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.daftarPerbandingan?.map((row) => (
                       <TableRow
                       key={row.name}
                       sx={{
                         "&:last-child td, &:last-child th": { border: 0 },
                       }}
                     >
                       <TableCell align="left">
                         {row?.namakriteriapertama}
                       </TableCell>
                       <TableCell align="center">
                         <ReactSelect
                           options={dataDrop}
                           styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                           defaultValue={{value: row?.idnilai, label: row?.namanilai}}
                           menuPortalTarget={document.body}
                           onChange={(v) =>
                             handlePilihPerbandingan(v.value, row)
                           }
                           menuPlacement="top"
                         />
                       </TableCell>
                       <TableCell align="right">
                         {row?.namakriteriakedua}
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
              Selesai
            </Button>
            {/* <Button variant="contained" onClick={submit} color="primary">
              Simpan
            </Button> */}
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ModalEditIntesitas;

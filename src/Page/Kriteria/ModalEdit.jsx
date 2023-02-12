import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { ModalDialog, Table } from "@mui/joy";
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalNewIntesitas from "./ModalNewIntesitas";
import { useQuery } from "@tanstack/react-query";
import { DeleteKriteria, getDataKriteria, getDataPerbandingan, postKriteria } from "../../Redux/Service/MasterService";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import ModalNew from "./ModalNew";

const ModalEdit = ({ show, closeModal, setIsloading, obj, submit }) => {
  const [modalNew, setModalNew] = useState(false);
  const [DetailData, setDetailData] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const { data, isLoading, refetch } = useQuery(
    ["kriteriaDetails"],
    () => {
      return getDataKriteria(`?idKriteriaInduk=${obj?.idKriteria}`);
    },
    { refetchIntervalInBackground: false }
  );
  const {
    data: perbandingan,
    isLoading: loadPerbandingan,
    refetch: refetchPerbandingan,
  } = useQuery(
    ["dropdownPerbandingan"],
    () => {
      return getDataPerbandingan();
    },
    { refetchIntervalInBackground: false }
  );

  const [dataDrop, setDataDrop] = useState([]);

  useEffect(() => {
    let data = [];

    perbandingan?.dropdown?.map((v) => {
      data.push({ value: v.id, label: v.keterangan });
    });

    setDataDrop(data);
  }, [perbandingan]);


  useEffect(() => {
    if (isLoading) {
      setIsloading(true)
    } else {
      setIsloading(false)
    }
  }, [isLoading])

  const cels = ["Nama", "Bobot Prioritas", "Memiliki", "Action"];

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
    DeleteKriteria(row.idKriteria).then((res) => {
      refetch()
      setModalDelete(false)
      setIsloading(false)
      toast.success('Hapus Kriteria berhasil')
    }).catch((err) => {
      setIsloading(false)
      setModalDelete(false)
      toast.error(`gagal Hapus Kriteria ${err}`)
    })
  }



  const handlePilihPerbandingan = (value, row) => {
    console.log(value);
    // setLoading(true);
    // postPerbandingan({idKriteriaPertama: row?.idkriteriapertama ,idKriteriaKedua: row?.idkriteriakedua, idPenilaian: value}).then((res) => {
    //   setModalNew(false)
    //   setLoading(false)
    //   toast.success('Perbandingan Kriteria berhasil')
    //   refetch()
    // }).catch((err) => {
    //   setLoading(false)
    //   setModalNew(false)
    //   toast.error(`gagal Perbandingan Kriteria ${err}`)
    // })
  };

  const handleNewKriteria = (row) => {
    setIsloading(true);
    postKriteria({...row, idKriteriaInduk: obj?.idKriteria})
      .then((res) => {
        refetch();
        setModalNew(false);
        setIsloading(false);
        toast.success("buat Kriteria berhasil");
      })
      .catch((err) => {
        setIsloading(false);
        setModalNew(false);
        toast.error(`gagal buat Kriteria ${err}`);
      });
  };

  // console.log(dataDrop?.filter((v) => v.value === 1)[0])



  return (
    <>
      {modalNew && <ModalNew
        show={modalNew}
        closeModal={() => setModalNew(false)}
        obj={DetailData}
        submit={handleNewKriteria}
      />
      }

      {modalDelete &&
        <ModalDelete
          show={modalDelete}
          closeModal={() => setModalDelete(false)}
          obj={DetailData}
          submit={handleHapusKriteria}
        />}


      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={show}
        onClose={() => closeModal()}
        sx={{ display: "flex", justifyContent: "center", }}
      >
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
          sx={{ width: "80%", background: "#FFF" }}
        >
          <ModalClose />
          <Typography id="layout-modal-title" component="h2">
            Sub Kriteria
          </Typography>
          <Button
            sx={{ marginBottom: "20px" }}
            variant="contained"
            onClick={() => openModalNew()}
          >
            Tambah Kriteria
          </Button>

          <Stack sx={{ overflowY: "auto", height: "60vh" }}>

            <Stack spacing={2}>
              <Typography level="3" textAlign="center">
                level 2 kemampuan {obj?.namaKriteria}
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
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell align="left">{row?.namaKriteria}</TableCell>
                        <TableCell align="left">{row?.bobot}</TableCell>
                        <TableCell align="left">{row?.jenis}</TableCell>
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
                Perbandingan Berpasangan Level 2 Kemampuan SQL
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
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell align="left">
                          {row?.namakriteriapertama}
                        </TableCell>
                        <TableCell align="center">
                          <ReactSelect 
                            options={dataDrop}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            menuPortalTarget={document.body}
                            defaultValue={{value: row?.idnilai, name: row?.namanilai}}
                            onChange={(v) => handlePilihPerbandingan(v.value, row)}
                            menuPlacement="top"
                            />
                        </TableCell>
                        <TableCell align="right">{row?.namakriteriakedua}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>

          </Stack>

          <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
            <Button variant="contained" onClick={closeModal} color="primary">
              Simpan
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

export default ModalEdit;

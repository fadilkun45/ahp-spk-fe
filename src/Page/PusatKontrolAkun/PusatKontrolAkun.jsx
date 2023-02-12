import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ModalNewAkun from "./ModalNew";
import ModalEditAkun from "./ModalEdit";
import { getUser } from "../../Redux/Service/MasterService";
import { useQuery } from "@tanstack/react-query";
import { postNewAkun, updateUser } from "../../Redux/Service/AuthService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";



const PusatKontrolAkun = ({setLoading}) => {
  const users = useSelector((state) => state.login.res)
  const [modalNew, setModalNew] = useState(false)
  const [DetailData, setDetailData] = useState(null)
  const [modalEdit, setModalEdit] = useState(false)
  const { data, isLoading, refetch } = useQuery(['kreiteriaPerbanding'], () => {
    return getUser()
  })

  useEffect(() => {
    if(isLoading){
      setLoading(true)
    }else{
      setLoading(false)
    }
  },[isLoading])



  const cels = ["Nama", "Email", "Jabatan", "Action"];



  const openModalNew = (row) => {
    setDetailData(row)
    setModalNew(true)
  }

  const openModalEdit = (row) => {
    setDetailData(row)
    setModalEdit(true)
  }

  const handleNewAkun = (row) => {
    setLoading(true)
    postNewAkun(row).then((res) => {
      setModalNew(false)
      setLoading(false)
      toast.success('buat akun berhasil')
      refetch()
    }).catch((err) => {
      setLoading(false)
      setModalNew(false)
      toast.error(`gagal buat akun ${err}`)
    })
  }

  
  const handleChangeAkun = (row) => {
    setLoading(true)
    updateUser(row.id,{nama: row.nama, kataSandi: row.kataSandi}).then((res) => {
      console.log(res)
      setModalEdit(false)
      setLoading(false)
      toast.success('Update akun berhasil')
      refetch()
    }).catch((err) => {
      setLoading(false)
      setModalEdit(false)
      toast.error(`gagal update akun ${err}`)
    })
  }

  return (
    <>
      {modalEdit && <ModalEditAkun submit={handleChangeAkun} show={modalEdit} closeModal={() => setModalEdit(false)} obj={DetailData} />}
      {modalNew && <ModalNewAkun submit={handleNewAkun} show={modalNew} closeModal={() => setModalNew(false)} obj={DetailData} />}
      <Button sx={{ marginBottom: "20px" }} variant="contained" onClick={() => openModalNew()} >Tambah Akun</Button>

      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {cels.map((item) => (
                <TableCell align="right">{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.daftarAkun?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row?.nama}</TableCell>
                <TableCell align="right">{row?.email}</TableCell>
                <TableCell align="right">{row?.jabatan}</TableCell>
                <TableCell align="right">
                  <Button variant="contained"  onClick={() => openModalEdit(row)}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PusatKontrolAkun;

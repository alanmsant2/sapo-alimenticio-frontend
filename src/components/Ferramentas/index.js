import React, { Component } from "react";
import { uniqueId } from "lodash";
// import filesize from "filesize";


import Upload from "../Upload";
import FileList from "../FileList";

import GlobalStyle from "../../styles/global";
import { Container, Content } from "../../styles";

import api from "../../services/api";
import './ferramentas.css';
import FullWidthTabs from '../Abas';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import Button from '@material-ui/core/Button';


class Ferramentas extends Component {
  state = {
    uploadedFiles: []
  };

  async componentDidMount() {
    const response = await api.get("api/arquivos/");

    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.titulo,
        // readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url
      }))
    });
  }

  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      // readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });

    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };

  processUpload = uploadedFile => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);
    data.append("titulo", uploadedFile.name);
    data.append("caminho", uploadedFile.file, uploadedFile.name);

    api
      .post("api/arquivos/", data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress
          });
        }
      })
      .then(response => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true
        });
      });
  };

  handleDelete = async id => {
    await api.delete(`api/arquivos/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  };

  async limpar(){
    await api.delete(`api/arquivos/`)
    .then(response => {
      // return(
      //   <CustomizedSnackbars titulo={''} mensagem={'Limpeza realizada com sucesso!'}/>
      // )
      alert('Limpeza realizada com sucesso!');
      window.location.reload();
      console.log(response);
    });
    // return alert('Limpar realizada');
  }


  async atualizar(){
    await api.put(`api/arquivos/`)
    .then(response => {
      // return(
      //   <CustomizedSnackbars titulo={''} mensagem={'Atualização realizada com sucesso!'}/>
      //   )
      alert('Atualização realizada com sucesso!');
      window.location.reload();
      console.log(response);
    });
    // return alert('Limpar realizada');
  }

  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  render() {
    const { uploadedFiles } = this.state;

    return (
      <div>
          <div className="ferramentas-text">
            <FullWidthTabs aba1={
                <div>
                  <Container>
                  <Content>
                      <Upload onUpload={this.handleUpload} />
                      {!!uploadedFiles.length && (
                        <FileList files={uploadedFiles} onDelete={this.handleDelete} />
                      )}
                    </Content>
                    <GlobalStyle />
                  </Container>

                </div> } 

                aba2={
                    <Button onClick={() => this.atualizar()}
                        variant="contained"
                        color="primary"                        
                        // className={classes.button}
                        startIcon={<CachedIcon />}
                      >
                        Atualizar Banco de Dados
                    </Button>
                }

                aba3={
                  <Button onClick={() => this.limpar()}
                      variant="contained"
                      color="secondary"
                      // className={classes.button}
                      startIcon={<DeleteIcon />}
                    >
                      Limpar Tabelas e Arquivos
                  </Button>
                }
            ></FullWidthTabs>
          </div>

      </div>

    );
  }
}

export default Ferramentas;

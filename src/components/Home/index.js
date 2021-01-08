import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './home.css';

class Home extends Component {

    state = {
        alimentos: [],
        selectedRow: null
    }

    async componentDidMount(){
        let lurl = process.env.REACT_APP_API_BACKEND+"/api/alimentos/";
        await fetch(lurl)
        .then((response) => response.json())
        .then((responseJson) => { this.setState({ alimentos: responseJson}); })
        .catch((error) => { console.error(error); });
    }


    render(){

        return (
            <div>
                <div className="home-text">                    
                    <p>Bem-vindo ao <span className="texto-interno">Sapo Alimentício</span>, aqui você irá encontrar informações nutricionais dos principais alimentos do mercado.</p>
                    {/* <p>{process.env.REACT_APP_API_BACKEND}</p> */}
                </div>
                <section className="sessao-tabela">


                    <div className="largura-tabela">
                        <MaterialTable
                            columns={[
                                { title: 'Nome', field: 'nome' },
                                { title: 'Quantidade', field: 'quantidade' },
                                { title: 'Proteínas', field: 'proteinas' },
                                { title: 'Carboidratos', field: 'carboidratos'},
                                { title: 'Gorduras', field: 'gorduras'}
                            ]}
                            data={this.state.alimentos}
                            title="Tabela de Alimentos"
                            // onRowClick={((evt, selectedRow) => this.setState(selectedRow.tableData.id))}
                            onRowClick={() => {}}
                            // onSelectionChange={((evt, selectedRow) => this.setState(selectedRow.tableData.id))}
                            options={{
                                
                                headerStyle: {
                                  backgroundColor: '#EFF2F7',
                                  font: '16px',
                                  fontWeight: 'bolder',
                                  color: '#47525E',
                                  fontFamily: 'Lato'
                                },
                                rowStyle: 
                                // rowData => ({
                                    // backgroundColor: (this.selectedRow === rowData.tableData.id) ? '#47525E' : '#FFF',
                                    // color: '#47525E',
                                    // fontFamily: 'Lato',
                                // }),
                                {
                                    color: '#47525E',
                                    // backgroundColor: '#47525E',
                                    fontFamily: 'Lato',

                                },
                                
                                pageSize:10,
                                pageSizeOptions: [5, 10, 20, 50, 100]
                            }}

                            localization={{
                                body: {
                                    emptyDataSourceMessage: 'Nenhum registro para exibir'
                                },
                                toolbar: {
                                    searchTooltip: 'Pesquisar'
                                },
                                pagination: {
                                    labelRowsSelect: 'linhas',
                                    labelDisplayedRows: '{count} de {from}-{to}',
                                    firstTooltip: 'Primeira página',
                                    previousTooltip: 'Página anterior',
                                    nextTooltip: 'Próxima página',
                                    lastTooltip: 'Última página'
                                }
                            }}
                       
                        ></MaterialTable>

                    </div>


                </section>
                <br/><br/><br/>

            </div>

        );
    }
}

export default Home;



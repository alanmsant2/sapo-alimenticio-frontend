import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './carboidratos.css';

class Carboidratos extends Component {

    state = {
        alimentos: []
    }

    async componentDidMount(){
        let lurl = "https://sapo-alimenticio.herokuapp.com/api/alimentos/carboidratos";
        fetch(lurl)
        .then((response) => response.json())
        .then((responseJson) => { this.setState({ alimentos: responseJson}); })
        .catch((error) => { console.error(error); });
    }


    render(){

        return (
            <div>
                <div className="carboidratos-text">                    
                    <p>Bem-vindo ao <span className="texto-interno">Sapo Alimentício</span>, aqui você irá encontrar informações nutricionais dos principais alimentos do mercado.</p>
                </div>
                <section className="sessao-tabela">
                    <div className="largura-tabela">
                        <MaterialTable
                            columns={[
                                { title: 'Nome', field: 'nome' },
                                { title: 'Quantidade', field: 'quantidade' },
                                { title: 'Proteínas', field: 'proteinas' },
                                { title: 'Carboidratos', field: 'carboidratos', cellStyle: {fontWeight: 'bolder',}},
                                { title: 'Gorduras', field: 'gorduras'}
                            ]}
                            data={this.state.alimentos}
                            title="Tabela de Alimentos com mais Caboidratos"
                            options={{
                                headerStyle: {
                                  backgroundColor: '#EFF2F7',
                                  font: '16px',
                                  fontWeight: 'bolder',
                                  color: '#47525E',
                                  fontFamily: 'Lato'
                                },
                                rowStyle: {
                                    color: '#47525E',
                                    fontFamily: 'Lato'                                    
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

export default Carboidratos;



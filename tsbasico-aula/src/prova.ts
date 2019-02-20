import {prompt} from 'inquirer';
import {VpHttp} from './http/vphttp';
interface Icategorias{
    categorias: string;
    disponivel: boolean;
}
interface Iprodutos{
    produto: string;
   disponivel: boolean;
}
export class Prova{

    private categorias : Array<Icategorias> = [];
    private produtos : Array<Iprodutos> = [];

    public relatorio(){
        prompt(
            [
            
                {
                    name: 'categoria',
                        type: 'list',
                        message: 'Qual a categoria desejada?',
                        choices: this.categorias.map(i => i.categorias),
                        default: 0,
                }/*,
                {
                    name: 'produto',
                        type: 'list',
                        message: 'produtos?',
                        choices: this.produtos.map(i => i.produto),
                        default: 0,
                }*/
            ]
        ).then(
            (answers : any) => {
                this.categorias = answers;
                this.produtos.forEach((element : any) => {
                    if (element.produto === answers.categoria) {
                        console.log(this.produtos)
                        
                    }

                });
            
            }
    );
}


public getCategorias(){
    new VpHttp('http://5c6c7ceed51de300146f5b7f.mockapi.io/categorias').get().subscribe(
        (data : any) => {
           this.categorias = data;
           this.getprodutos();
        },
        (error : any) => {
            console.log(error);
        }
    );
}
public getprodutos(){
    new VpHttp('http://5c6c7ceed51de300146f5b7f.mockapi.io/produtos').get().subscribe(
        (data : any) => {
           this.produtos = data;
           this.relatorio();
        },
        (error : any) => {
            console.log(error);
        }
    );
}
}







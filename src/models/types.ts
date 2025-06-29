type Endereco = {
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal?: string;
  informacoesAdicionais?: string;
};

type Telefone = {
  ddd: string;
  numero: string;
};

export type Cliente = {
  id?: number;
  nome: string;
  sobreNome: string;
  nomeSocial: string; 
  cpf?: string;      
  email?: string | null;
  telefones?: Telefone[];
  genero?: string;
  data_nascimento?: string;
  endereco: Endereco;
};

import { FormEvent, useState} from 'react';
import Modal from 'react-modal';
import { Container, TransactionsTypeContainer, RadioBox } from './styles'
import closeImg from '../../assets/vector.svg';
import incomeImg from '../../assets/entradas.svg';
import outcomeImg from '../../assets/saídas.svg';

import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const {createTransaction} = useTransactions();
    const [title, setTitle] = useState('');
    const [amount, setamount] = useState(0);
    const [category, setCategory] = useState('');

    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

      await createTransaction({
           title, 
           amount,
           category,
           type,
       })

       setTitle('');
       setamount(0);
       setCategory('');
       setType('deposit');

       onRequestClose();
    }


    return (
        <Modal isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar Modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)} />
                <input type="number" placeholder="Valor"
                    value={amount}
                    onChange={event => setamount(Number(event.target.value))} />

                <TransactionsTypeContainer>

                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposit'); }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entradas" ></img>
                        <span>Entrada</span>

                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => { setType('withdraw'); }}
                        isActive={type === 'withdraw'}
                        activeColor="red"

                    >
                        <img src={outcomeImg} alt="Saídas" ></img>
                        <span>Saída</span>

                    </RadioBox>

                </TransactionsTypeContainer>

                <input placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />
                <button type="submit">Cadastrar</button>

            </Container>
        </Modal>
    )
}
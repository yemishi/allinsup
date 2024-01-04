
import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { axiosRequest, toast } from "../../components";

const PaymentGuard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosRequest.getUser();
                if (response.status === 200) {
                    if (!response.data.address && location.pathname === '/checkout/address') {
                        toast('É preciso adicionar um endereço de entrega antes');
                        navigate('/checkout/address');
                    } else if (location.pathname === '/checkout/payment') {
                        // Coloque aqui as verificações específicas para a rota de pagamento, se necessário
                    }
                } else {
                    toast.error('É preciso fazer login antes');
                    navigate("/");
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
                // Lógica para lidar com erros ao buscar dados do usuário
            }
        };

        fetchData();
    }, [navigate, location.pathname]);

    return <Outlet />; // ou outro componente, se necessário
};

export default PaymentGuard;
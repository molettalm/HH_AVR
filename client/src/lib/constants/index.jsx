import {
	HiOutlineViewGrid,
	HiOutlinePlusCircle,
	HiOutlineFire,
	HiOutlineBeaker,
	HiOutlineCog
} from 'react-icons/hi'

export const SIDEBAR_LINKS = [
	{
		key: 'resumo',
		label: 'Resumo',
		path: '/resumo',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'metricas',
		label: 'Métricas Diárias',
		path: '/metricas',
		icon: <HiOutlinePlusCircle />
	},
	{
		key: 'exercicios',
		label: 'Exercícios',
		path: '/exercicios',
		icon: <HiOutlineFire />
	},
	{
		key: 'medicamentos',
		label: 'Medicamentos',
		path: '/medicamentos',
		icon: <HiOutlineBeaker />
	}
]

export const SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'congiguracoes',
		label: 'Configurações',
		path: '/congiguracoes',
		icon: <HiOutlineCog />
	}
]

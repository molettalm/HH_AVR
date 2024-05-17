import React from 'react'

export default function Medicamentos() {

	return (
		<form>
			<div class="grid gap-6 mb-6 md:grid-cols-1">
				<div>
					<label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Usuário</label>
					<input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="FlavioNeto" required />
					<p id="username" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Por favor insira seu usuário!</p>
			    </div>
				<div>
					<label for="medicine_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nome do Remédio</label>
					<input type="text" id="medicine_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rivotril" required />
			    </div>
				<div>
					<label for="period" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Período de Ingestão</label>
					<input type="number" id="medicine_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="8 horas" required />
					<p id="username" class="mt-2 text-sm text-gray-500 dark:text-gray-400">De quantas em quantas horas vai tomar seu remédio?</p>
				</div>
				<div>
				    <label for="datetime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Primeira Dose</label>
					<input type="datetime-local" id="first_intake" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
					<p id="username" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Selecione o dia e o horário da primeira dose</p>
				</div>
			</div>
			<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar Medicamento</button>
		</form>
	)
}

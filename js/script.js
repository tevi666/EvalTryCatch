const filterByType = (type, ...values) => values.filter(value => typeof value === type),
//type and ...values = в функцию filterByType принимаем тип и другие аргумены, которые собираются в массив values, функция возвращает новый результирующий массив))
	// values.filter = проходится по массиву values методом filter  
	//value => typeof value === type  = если тип данных текущего элемента массива values совпадает с типом, который мы получили аргументом в функцию, то это значение попадает в результирующий массив)

	hideAllResponseBlocks = () => { //функция для скрытия эл-тов на стр)
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //получаем со стр все эл div с классом .dialog__response-block, формируем из них массив
		responseBlocksArray.forEach(block => block.style.display = 'none'); //каждому эл массива добавляем стиль display = 'none', чтобы не показывать блок на стр)
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //функция для отображения эл-тов на стр, 
	//получает в качестве аргументов селектор блока, который нужно отобразить, текст, который отобразится и селектор блока, в который будет помещен текст
		hideAllResponseBlocks(); //сначала скрываем все эл
		document.querySelector(blockSelector).style.display = 'block'; //затем задаем стиль display = 'block' тому блоку, который получили первым аргументом
		if (spanSelector) { //если был передан spanSelector и он не является пустым или null
			document.querySelector(spanSelector).textContent = msgText; //то в эл с этим селектором мы помещаем текст, полученный вторым параметром в функцию 
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //функция для отображения сообщения об ошибке

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //функция для отображения сообщения об успешном выполнении программы

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //функция для отображения блока, в котором написано 'Пока что нечего показать.'

	tryFilterByType = (type, values) => {
		//функция фильтра данных, получает тип (из инпута "тип данных") и строку с данными (из инпута "данные")
		try {  //попробует сделать следующее: 
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //Метод eval() выполняет код, представленный строкой, 
			//то есть мы вызываем функцию filterByType, передаем в неё тип данных и строку с данными(полученные как аргументы)
			//поскольку filterByType возвращает массив, мы можем применить к нему метод join и все элементы массива переписать в одну строку (разделив элементы запятыми)
			//эту строку помещаем в новый массив valuesArray (он будет состоять из одного элемента)
			const alertMsg = (valuesArray.length) ? // если массив valuesArray не пустой, 
				`Данные с типом ${type}: ${valuesArray}` : // то в alertMsg записываем текст, в котором отображаем тот тип данных, который получили из инпута и значения, которые подходят под этот тип данных
				`Отсутствуют данные типа ${type}`; //иначе сообщаем, что такого типа данных в строке из инпута нет
			showResults(alertMsg); //вызываем showResults и передаем сформированный текст из переменной alertMsg
		} catch (e) { //если предыдущие действия вызвали ошибку,
			showError(`Ошибка: ${e}`); //то мы показываем её на стр, вызывая функцию showError и передавая в неё объект ошибки
		}
	};

const filterButton = document.querySelector('#filter-btn'); //получаем со стр кнопку "фильтровать"

filterButton.addEventListener('click', e => { //добавляем обработчик по клику на кнопку "фильтровать"
	const typeInput = document.querySelector('#type'); //получаем со страницы input "тип данных"
	const dataInput = document.querySelector('#data'); //получаем со страницы input с введенными данными

	if (dataInput.value === '') { //если ничего не ввели в поле "Данные"
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //подсвечиваем поле и выводим текст, что нужно заполнить поле
		showNoResults(); //вызвваем функцию showNoResults
	} else { //иначе
		dataInput.setCustomValidity(''); //очищаем значение для валидации и не подсвечиваем поле
		e.preventDefault(); //отменяем стандартное поведение эл (в данном случае кнопка submit отправляет форму и перезагружает стр)
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вызываем функцию tryFilterByType, куда передаем значения инпутов, перед этим удаляя пробелы в начале и конце
	}
});


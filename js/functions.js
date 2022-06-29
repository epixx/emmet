        console.log("Версия 0.2.3");

	// перезапускает хайлайтер в нужном окошке

	function reprism(selector,value){

		$(selector).html(htmlSpecialChars(value));

		Prism.highlightAll();

		console.log("Призмы перезагружены");

	}

	// возвращает развернутую эммет строоку, удаляет указатели

	function expand(line){

		var line = emmet.expandAbbreviation(line,null,null,"body");

		var newline = line.replace(/\${.*?\}\s?/g, "");

		return newline; // .replace("${14:Document}", "Welcome to Emmet");;

	}

	// вызывается для проверки задания.


	function checkit(){

			var emmet = $("#task-answer").val();

			var candidate = expand(emmet);

			reprism("#task-result",candidate);

			if((candidate.toLowerCase() == expand(example).toLowerCase()) || (example=="lorem") )  {

				completed();


			}else{

				$(".box-result").addClass("border-fail");

			}

	}

	/*
	*  Вызывается, если совпадение подтверждено
	*/

	function completed(){

		console.log("Завершен уровень "+localStorage["level"]+" из "+tasks['total']);

				if(localStorage["level"]>=tasks['total']){

					finish();

				}

				$(".box-result").removeClass("border-fail");

				$(".box-result").addClass("border-success");


				$(".task_next").delay(1400).fadeIn(400);


				$("#task-answer").blur();
 				$(".task_next").focus();

 				status = "2";

	}

	function progress(){



		var progress = localStorage["level"]/tasks['total']*100+"%";

		console.log("текущий прогресс = "+ progress);

		$("#progress").css("width",progress);

	}

	function next(){

		localStorage["level"]++;
		start(localStorage["level"]);

	}



	function start(taskid){

		var task = tasks[taskid];

		if(typeof task=="undefined") {return false;}       // если не смогли прочитать задачу – падаем с ошибкой

		$("#task-title").html(task['task-title']);          // показываем название задачи.
		$("#task-theory").html(task['task-theory']);        // показываем теорию или инструкцию.

		example = task['task-example'];  // получаем решение текущей задачи

		reprism("#task-example",expand(example));  // активируем подсветку синтаксиса

		$("#task-result").html("{Здесь будет результат}");

		$(".box-result").removeClass("border-success");

		$("#task-answer").val("");

		progress(localStorage["level"],tasks['total']);

		$(".task_next").fadeOut();

		$( "#task-answer").focus();

		status = "1";


	}


	function finish(){


		$(".action").delay(1000).fadeOut();

		modal();

		//$(".modal").show();

		$(".modal .message").html("<img src='http://31.media.tumblr.com/tumblr_lbf7t6dfl01qzkrfxo1_500.jpg' alt='' /><p>Вы прошли все задания этого небольшого курса. </p><p>Если у вас есть идеи или предложения по его улучшению – <a href='https://vk.com/im?media=&sel=713326665'>напишите нам прямо сейчас</a></p>");

	}

	function modal(){


		$("body").append(

			'<div class="blackout"></div>'

		);


		$("body").append(

			'<div class="modal">	<div class="message">  </div></div>'

		);

		$("body .modal").hide();

		$("body .blackout").delay(1400).fadeIn(1200);

		$("body .modal").delay(1400).slideDown(1200);

	}

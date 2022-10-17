
        var data = [
            [3, 2, 1, 0],
            [],
            []
        ]
        var moves = 0
        var blockSelected = undefined
        var towerSelected = undefined
        var count = 0

        // function to increment the counter
        function incrMove() {
            moves += 1
            document.getElementById("count").innerText = moves
            console.log(moves)
        }

        // function for timer
        var stopwatch = document.getElementById("stopwatch");
        var timeoutId = null;
        var ms = 0;
        var sec = 0;
        var min = 0;
        document.getElementById("stopwatch").innerHTML = '00:00';
        /* function to start stopwatch */
        function start() {
            timeoutId = setTimeout(function() {
            ms = parseInt(ms);
            sec = parseInt(sec);
            min = parseInt(min);
            ms++;
            if (ms == 100) {
                sec = sec + 1;
                ms = 0;
            }
            if (sec == 60) {
                min = min + 1;
                sec = 0;
            }
            if (ms < 10) {
                ms = '0' + ms;
            }
            if (sec < 10) {
                sec = '0' + sec;
            }
            if (min < 10) {
                min = '0' + min;
            }
            stopwatch.innerHTML = min + ':' + sec;
            // calling start() function recursivly to continue stopwatch
            start();
            }, 10);
            // setTimeout delay time 10 milliseconds
        }
        /* function to pause stopwatch */
        function pause() {
            clearTimeout(timeoutId);
            count = 0
            moves = 0
        }
        /* function to reset stopwatch */
        function reset() {
            ms = 0;
            sec = 0;
            min = 0;
            clearTimeout(timeoutId);
            stopwatch.innerHTML = '00:00';
        }

        // function for timer ends here

        function towerClicked(index){
            if (blockSelected == undefined){
                if (data[index].length > 0){
                    // select the block on top
                    blockSelected = data[index][data[index].length - 1]
                    towerSelected = index
                    console.log('Block', blockSelected, 'selected from tower' + (index+1))
                }
            } else {
                if (data[index].length == 0){
                    // place the block on the target tower
                    data[index] = [data[towerSelected].pop()]
                    incrMove()
                } else if (data[index][data[index].length - 1] > blockSelected){
                    // place the block on the top of the target tower
                    data[index].push(data[towerSelected].pop())
                    incrMove()
                }
                console.log('Block', blockSelected, 'dropped on tower' + (index+1))
                blockSelected = undefined
                towerSelected = undefined
            }
            updateUI()
        }

        function updateUI(){
            // clears and updates the ui
            for (let index=0; index<3; index++){
                towers[index].innerHTML = ""
                
                // highlight selected pole
                if (towerSelected == index){
                    towers[index].classList.add('selected')
                } else {
                    towers[index].classList.remove('selected')
                }

                // populate towers with blocks
                for (var block of data[index]) {
                    element = document.createElement('div')
                    element.classList.add('block'+(block+1))
                    element.classList.add('block')
                    towers[index].appendChild(element)
                }

                // add draggable properties to top block
                if (data[index].length > 0){
                    towers[index].childNodes[towers[index].childNodes.length-1].draggable = true
                    towers[index].childNodes[towers[index].childNodes.length-1].ondragstart = (event) => {
                        dragHandler(index, event)
                    }
                }

                // pause time when solved
                if (data[index].length === 4){
                    pause()
                }
            }
        }

        function dragHandler(tower, event){
            if (count === 0) {
                reset()
                start()
                count += 1
            }
            console.log('dragging from', tower)
            towerSelected = tower
            blockSelected = data[tower][data[tower].length - 1]
        }

        function dropHandler(tower, event){
            // console.log('dragged to', tower)
            towerClicked(tower)
            return false
        }

        function dragOverHandler(event){
            event.preventDefault()
        }

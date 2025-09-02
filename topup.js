(function(){
    const params = new URLSearchParams(window.location.search);
    const gameCode = params.get('game');

    // Simple catalog mirroring script.js product codes
    const games = {
        'PUBG-MOBILE': {
            title: 'PUBG Mobile',
            subtitle: 'Top up UC instantly',
            image: 'https://via.placeholder.com/300x200/ff6b35/ffffff?text=PUBG+Mobile',
            idLabel: 'Player ID',
            needsZone: false,
            denomLabel: 'Select UC package',
            denoms: [
                { id: 'uc60', name: '60 UC', amount: 60, price: 0.99 },
                { id: 'uc300', name: '300 UC', amount: 300, price: 4.99 },
                { id: 'uc600', name: '600 UC', amount: 600, price: 9.99 },
                { id: 'uc1500', name: '1500 UC', amount: 1500, price: 24.99 }
            ]
        },
        'FREE-FIRE': {
            title: 'Free Fire',
            subtitle: 'Top up Diamonds instantly',
            image: 'https://via.placeholder.com/300x200/ff4757/ffffff?text=Free+Fire',
            idLabel: 'Player ID',
            needsZone: true,
            denomLabel: 'Select Diamonds package',
            denoms: [
                { id: 'dia50', name: '50 Diamonds', amount: 50, price: 0.99 },
                { id: 'dia310', name: '310 Diamonds', amount: 310, price: 4.99 },
                { id: 'dia520', name: '520 Diamonds', amount: 520, price: 7.99 },
                { id: 'dia1060', name: '1060 Diamonds', amount: 1060, price: 14.99 }
            ]
        }
    };

    const game = games[gameCode] || games['PUBG-MOBILE'];

    const el = (id) => document.getElementById(id);
    el('gameTitle').textContent = game.title + ' Top Up';
    el('gameSubtitle').textContent = game.subtitle;
    el('gameImage').src = game.image;
    el('idLabel').textContent = game.idLabel;
    el('denomLabel').textContent = game.denomLabel;
    if (game.needsZone) {
        document.getElementById('zoneWrapper').style.display = '';
    }

    const denomsContainer = el('denoms');
    let selectedId = null;
    game.denoms.forEach(d => {
        const btn = document.createElement('button');
        btn.className = 'denom';
        btn.type = 'button';
        btn.innerHTML = `<div>${d.name}</div><div class="helper">$${d.price.toFixed(2)}</div>`;
        btn.addEventListener('click', () => {
            selectedId = d.id;
            Array.from(denomsContainer.children).forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
        });
        denomsContainer.appendChild(btn);
    });

    el('payBtn').addEventListener('click', () => {
        const playerId = el('playerId').value.trim();
        const zoneId = el('zoneId') ? el('zoneId').value.trim() : '';
        const email = el('email').value.trim();
        const payment = el('payment').value;

        if (!playerId) {
            alert('Please enter your Player ID');
            return;
        }
        if (game.needsZone && !zoneId) {
            alert('Please enter your Zone ID');
            return;
        }
        if (!selectedId) {
            alert('Please select a package');
            return;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email');
            return;
        }

        // Simulate MadzPay-like redirect/flow
        const order = {
            game: gameCode,
            playerId,
            zoneId: game.needsZone ? zoneId : undefined,
            packageId: selectedId,
            payment,
            email
        };
        // In a real integration, redirect to payment gateway with order payload
        alert('Proceeding to payment...\n' + JSON.stringify(order, null, 2));
    });
})();



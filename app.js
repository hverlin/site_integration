/**
 * Created by Hugues on 05/08/2015.
 */

var inteApp = angular.module('inteApp', ['ngSanitize']);
inteApp.config(function ($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  // oui mais ça fait chier pour GMAPS  :(
  // //TODO : il faut changer pour l'api angular
  $sceProvider.enabled(false);
});

inteApp.directive('inteEvent', function () {
  return {
    templateUrl: 'eventDirective.html',
    replace: true,
    scope: {
      event: '=',
      left: '=',
      last: '='
    },
    link: function (scope, element, attrs) {
      scope.$watch('left', function (left) {
        if (left) {
          element.children().addClass('badge-left');
        }
        else {
          element.children().addClass('badge-right');
        }
      });
      scope.$watch('last', function (last) {
        if (last) {
          $("a.togglemap").click(function () {
            var $map = $(this).parents("li").children(".map");
            // ne mettre la src que s'il n'en a pas, pour eviter de refaire un chargement de la map
            if (!$map.attr("src")) {
              $map.prop("src", function () {
                return $(this).data("src");
              })
            }
            $map.slideToggle(200);
          });
        }
      });
    },
    controller: function ($scope, $sce) {
      $scope.getIframeSrc = function (loc) {
        return 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCYG3-5euwVqnAeuqUj4gJ8dfvtHOnBZBc&' + loc;
      };
    }
  };
});

inteApp.filter('gmapUrl', function ($sce) {
  return function (loc) {
    return $sce.getTrustedResourceUrl(loc);
  };
});

inteApp.controller('inteController', ['$scope', function ($scope) {
  var self = this;

  self.activityList = [
    {
      title: 'Accueil des Admis Directs',
      date: 'Mercredi 9 Septembre',
      hour: '10h - 12h30',
      img: 'assets/img/neel_1.jpg',
      gmaplocation: 'zoom=15&q=loc:45.784136+4.882584',
      location: 'Pelouse du Premier Cycle',
      need: '',
      price: '',
      text: [
        "C’est parti pour 3 ans de combats acharnés ! Les admis directs viendront s’inscrire à l’INSA : l’occasion d’admirer  les bâtiments où étudient les élèves du Premier Cycle.",
        "Après avoir signé tout plein de papiers et s’être fait tirer le portrait  (attention, pas le droit à l’erreur, ce sera votre photo officielle pendant 3  ans), les jeunes recrues seront accueillies par les super-héros déjà sur  place.",
        "C’est l’occasion d’un premier contact pour poser toutes les questions qui vous  brûlent les lèvres."
      ]
    },

    {
      title: 'Découverte de la Tête d’Or',
      date: 'Jeudi 10 Septembre',
      hour: '14h',
      img: 'assets/img/tetedor.jpg',
      gmaplocation: 'zoom=15&q=La+Doua -+Gaston+Berger,+Lyon,+France',
      location: 'RDV arrêt de tram GB',
      need: 'Si tu aimes faire la cuisine, tu peux ramener un gâteau ! On fera un grand goûter avec les spécialités de chacun.',
      price: '',
      text: [
        "Pour tous ceux qui ne connaissent pas Lyon (et pour les autres ce sera  l’occasion d’étaler vos connaissances).",
        "Le parc de la Tête d’Or et son jardin zoologique sont à proximité de l’école.",
        "Nous vous proposons donc d’aller tester vos super-pouvoirs au cours d’une après-midi tranquille!"
      ]
    },


    {
      title: 'Soirée K-Fêt',
      date: 'Jeudi 10 Septembre',
      hour: '19h30',
      img: 'assets/img/kfet.png',
      gmaplocation: 'zoom=15&q=K-fêt,+Avenue+Jean+Capelle+Ouest,+Villeurbanne,+France',
      location: 'K-Fêt',
      need: '',
      price: '',
      text: [
        'Afin de bien commencer l’année tous ensemble, nous te proposons une soirée à la K-Fêt : c’est le bar tenu par des INSAliens qui est à la Maison Des Etudiants.',
        'Et si tu es plutôt du genre «sans alcool la fête est plus folle», sache qu’ils proposent aussi de nombreux softs/diluants.'
      ]
    },

    {
      title: 'Quizz des Héros',
      date: 'Vendredi 11 Septembre',
      hour: '19h',
      img: 'assets/img/quizz.png',
      gmaplocation: 'zoom=15&q=loc:45.782051+4.872578',
      location: 'RDV en bas du bâtiment IF côté tram (GB)',
      need: '',
      price: '',
      text: [
        'Pour que tu puisses tester tes connaissances dans le domaine, Nos meilleurs instructeurs t’ont préparé un quizz de culture générale sur les super-héros !',
        'Il y aura une récompense pour les plus téméraires...'
      ]
    },

    {
      title: 'Visite du Département IF et du campus',
      date: 'Samedi 12 Septembre',
      hour: '10h',
      img: 'assets/img/if.jpg',
      gmaplocation: 'zoom=15&q=loc:45.782051+4.872578',
      location: 'RDV en bas du bâtiment IF',
      need: '',
      price: '',
      text: [
        "Afin que vous ne soyez pas trop perdus lors de vos premières journées de cours, nous vous proposons une visite en avant-première des locaux fabuleux de notre département Informatique, passages secrets compris !"
      ]
    },

    {
      title: 'Soirée en ville',
      date: 'Samedi 12 Septembre',
      hour: '19h30',
      img: 'assets/img/beer.png',
      gmaplocation: 'zoom=15&q=loc:45.782051+4.872578',
      location: 'RDV en bas du bâtiment IF',
      need: 'Il te faudra 2 tickets de tram',
      price: '',
      text: [
        "Quoi de mieux qu’une petite soirée «posey’» dans un bar à parler de nos exploits passés et à venir ?"
      ]
    },

    {
      title: 'Petit déj’ au Départ’',
      date: 'Dimanche 13 Septembre',
      hour: '10h',
      img: 'assets/img/dej.jpg',
      gmaplocation: 'zoom=15&q=loc:45.782051+4.872578',
      location: 'RDV en bas du bâtiment IF côté tram (GB)',
      need: '',
      price: '',
      text: [
        "Avant l’effort, le réconfort !",
        "Viens prendre le petit déjeuner avec nous au département, ça te permettra d’être bien en forme avant le..."
      ]
    },

    {
      title: 'Pastis Pétanque',
      date: 'Dimanche 13 Septembre',
      hour: '14h',
      img: 'assets/img/petanque.png',
      gmaplocation: 'zoom=15&q=loc:45.780061+4.873506',
      location: 'RDV en bas du Magellan',
      need: '',
      price: '',
      text: [
        "Viens défier les autres recrues au cours de cette pétanque apocalyptique !",
        "Et comme pétanque rime avec pastis (si si !), nous te proposons de fêter tes victoires et tes défaites avec ce délicieux nectar anisé. (Pas trop de folie, la rentrée est le lendemain pour toi !)"
      ]
    },

    {
      title: 'Barathon',
      date: 'Lundi 14 Septembre',
      hour: '19h',
      img: 'assets/img/barathon.png',
      gmaplocation: 'zoom=15&q=La+Doua -+Gaston+Berger,+Lyon,+France',
      location: 'RDV arrêt de tram GB',
      need: 'Il te faudra 2 tickets de tram',
      price: '10',
      text: [
        "C’est une des épreuves les plus dures de ta formation de super-héros.",
        "Véritable épreuve d'endurance, cette soirée te permettra de découvrir en équipe les bars les plus emblématiques de Lyon, avec bien sûr des tarifs réservés aux super-héros !"
      ]
    },

    {
      title: 'Soirée Jeux',
      date: 'Mardi 15 Septembre',
      hour: '19h',
      img: 'assets/img/jeux.png',
      gmaplocation: 'zoom=15&q=loc:45.782051+4.872578',
      location: 'Amphi GB)',
      need: '',
      price: '',
      text: [
        "Quoi de mieux qu’une petite soirée Chill avec des amis et des inconnu(e)s autour de jeux emblématiques qui feront flancher les neurones des plus courageux ou qui provoqueront des fous rires pour les plus prudents ?"
      ]
    },

    {
      title: 'Soirée au Resto',
      date: 'Mercredi 16 Septembre',
      hour: '19h30',
      img: 'assets/img/restaurant.png',
      gmaplocation: 'zoom=15&q=La+Doua -+Gaston+Berger,+Lyon,+France',
      location: 'arrêt de tram GB',
      need: 'Il te faudra 2 tickets de tram',
      price: '15',
      text: [
        "Cela fera une semaine que tu seras arrivé à l’INSA. Tu connaîtras donc déjà les joies des restos universitaires et de leur légendaire variété ! C’est pourquoi nous te proposons une soirée pizzas (non nous ne ferons pas de placement de produits) dans un resto à proximité !"
      ]
    },

    {
      title: 'Le Rallye',
      date: 'Jeudi 17 Septembre',
      hour: '14h',
      img: 'assets/img/rallye.jpg',
      gmaplocation: 'zoom=15&q=La+Doua -+Gaston+Berger,+Lyon,+France',
      location: 'RDV arrêt de tram GB',
      need: 'Il te faudra 2 tickets de tram et ton super costume de super héros',
      price: '',
      text: [
        "Pour ceux qui ne le savent pas encore, les jeudis après-midis à l’INSA sont libres ! En ce premier Jeudi libre, nous te convions à notre Rallye.",
        "Le but est extrêmement simple : te perdre dans Lyon pour que tu y combattes le crime ! A la fin nous organiserons un podium pour célébrer le meilleur justicier !Pense bien à prendre ton costume, sinon on pourrait te démasquer..."
      ]
    },


    {
      title: 'Conférence Parrain (Sopra)',
      date: 'Vendredi 18 Septembre',
      hour: '14h',
      img: 'assets/img/sopra.png',
      gmaplocation: 'zoom=15&q=loc:45.782051+4.872578',
      location: 'Amphi Gaston Berger',
      need: '',
      price: '',
      text: [
        "Chaque promotion de super-héros est parrainée par une entreprise spécialisée dans la lutte contre le crime.",
        "La vôtre sera Sopra, qui vous offrira une conférence grandiose à l’issue de laquelle aura lieu un buffet tout aussi impressionnant ! Mais ce n’est pas tout..."
      ]
    },

    {
      title: 'Le WEI !',
      date: '18, 19 et 20 Septembre',
      hour: '16h',
      img: 'assets/img/wei.png',
      gmaplocation: 'zoom=15&q=loc:45.782051+4.872578',
      location: 'Amphi Gaston Berger',
      need: 'Des affaires salissantes, ton super costume de super héros, un maillot de bain, une serviette…',
      price: '25',
      text: [
        "LE Week-End d’Intégration, ou l’événement le plus énorme de l’année ! Ne prévois rien ce week-end car tout est déjà prévu pour toi !"
      ]
    }

  ];
}]);

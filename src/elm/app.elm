import Html exposing (..)
import Html.App as Html
import Http
import Json.Decode as Json
import Task

main : Program Never
main =
  Html.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

type alias Model =
    { keys: List String
    , selected: String
    }

init : (Model, Cmd Msg)
init =
    (Model [ "item1", "item2", "items3" ] "", getFeatures)

type Msg
    = FetchKeys
    | FetchSucceed (List String)
    | FetchFail Http.Error

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        FetchKeys ->
            (model, getFeatures)

        FetchSucceed keys ->
            (Model keys model.selected, Cmd.none)

        FetchFail _ ->
            (model, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

getFeatures : Cmd Msg
getFeatures =
    let url = "http://localhost:3000/api/features/keys"
    in Task.perform FetchFail FetchSucceed (Http.get decodeFeatures url)

decodeFeatures : Json.Decoder (List String)
decodeFeatures =
     Json.list Json.string

listItem : String -> Html option
listItem feature =
    option [] [ text feature ]

view : Model -> Html Msg
view model =
    div []
        [
            select [] (List.map listItem  model.keys)
        ]

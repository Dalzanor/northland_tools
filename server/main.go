package main

import (
	"net/http"

	"github.com/Dalzanor/northland_tools/server/api"
)

func main() {
	srv := api.NewServer()
	http.ListenandServe(":8080", srv)
}
